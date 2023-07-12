import { styled } from "styled-components";
import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingTransparent from "../../assets/loadingTransparent.gif";
import { Back, Title, ImageBox, Container } from "./StyledProfile";
import { Icon } from "react-icons-kit";
import { arrow_left } from "react-icons-kit/ikons/arrow_left";
import { validatePassword } from "../../helpers/helpers";
import { ErrorMsg, Status, StatusBox } from "../authentication/StyledForm";

// account information of user, can update or delete the account too
const Settings = ({ onBack }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [confirmation, setConfirmation] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const handleUpdate = async () => {
    setError(null);
    setStatus(null);

    try {
      // validation
      if (!editingField) {
        throw new Error("Must select a field to update.");
      }
      if (!value || value === "") {
        throw new Error(`${editingField.toUpperCase()} must not be empty.`);
      }
      if (editingField === "email") {
        if (value.indexOf("@") <= -1) {
          throw new Error("Email must include @.");
        }
        if (value.length < 3) {
          throw new Error("Email must be minimum 3 characters.");
        }
      } else if (editingField === "name") {
      } else if (editingField === "password") {
        const passwordErrors = validatePassword(value);
        if (passwordErrors.length > 0) {
          throw new Error(passwordErrors.join(" "));
        }
      }
      if (user) {
        const updateUser = user;

        updateUser[editingField] = value;

        const response = await fetch(`/api/users/${user._id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser),
        });
        const data = await response.json();

        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setUser(updateUser);
          setEditingField(null);
          setValue("");
          setStatus("Edited Successfully.");
        }
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (user._id === currentUser) {
      try {
        const response = await fetch(`/api/users/${user._id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (data) {
            setCurrentUser(null);
            window.sessionStorage.removeItem("currentUser");
            navigate("/");
          } else {
            throw new Error(data.message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      if (currentUser) {
        const response = await fetch(`/api/users/${currentUser}`);
        const data = await response.json();
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (mounted) {
            setUser(data.data);
          }
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  const handleCancel = () => {
    setEditingField(null);
    setError(null);
    setStatus(null);
  };

  return (
    <Container>
      <Back onClick={() => onBack()}>
        <Icon
          size={15}
          icon={arrow_left}
          style={{ color: "var(--content-color)" }}
        />
        Back
      </Back>

      <Title> Account Information </Title>
      {user ? (
        <div>
          <Box>
            <Text>Name</Text>
            {editingField === "name" ? (
              <EditBox>
                <Input
                  placeholder="name"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
                <div>
                  <Edit onClick={handleCancel}> Cancel </Edit>
                  <Edit onClick={() => handleUpdate()}> Update </Edit>
                </div>
              </EditBox>
            ) : (
              <>
                <TextField>{user.name}</TextField>
                <Edit
                  onClick={() => {
                    setValue(user.name);
                    setEditingField("name");
                  }}
                >
                  {" "}
                  Edit{" "}
                </Edit>
              </>
            )}
          </Box>
          <Box>
            <Text>Email</Text>

            {editingField === "email" ? (
              <EditBox>
                <Input
                  placeholder="email"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
                <div>
                  <Edit onClick={handleCancel}> Cancel </Edit>
                  <Edit onClick={() => handleUpdate()}> Update </Edit>
                </div>
              </EditBox>
            ) : (
              <>
                <TextField>{user.email}</TextField>
                <Edit
                  value={user.email}
                  onClick={() => {
                    setValue(user.email);
                    setEditingField("email");
                  }}
                >
                  {" "}
                  Edit{" "}
                </Edit>
              </>
            )}
          </Box>
          <Box>
            <Text>Password</Text>
            {editingField === "password" ? (
              <EditBox>
                <Input
                  placeholder="•••••••••••"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
                <div>
                  <Edit onClick={handleCancel}> Cancel </Edit>
                  <Edit onClick={() => handleUpdate()}> Update </Edit>
                </div>
              </EditBox>
            ) : (
              <>
                <TextField> ••••••••••• </TextField>
                <Edit
                  onClick={() => {
                    setEditingField("password");
                    setValue("");
                  }}
                >
                  {" "}
                  Edit{" "}
                </Edit>
              </>
            )}
          </Box>
          <DeleteBox>
            <div>
              <Edit onClick={() => setConfirmation(true)}>Delete Account</Edit>
            </div>
            <Delete>
              {confirmation && (
                <>
                  <div>Are you sure you want to delete this account?</div>
                  <div>
                    <Edit onClick={() => setConfirmation(false)}>No</Edit>
                    <Edit onClick={() => handleDelete()}>Goodbye</Edit>
                  </div>
                </>
              )}
            </Delete>
          </DeleteBox>
          <StatusBox>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {status && <Status>{status}</Status>}
          </StatusBox>
        </div>
      ) : (
        <ImageBox>
          <img src={loadingTransparent} />
        </ImageBox>
      )}
    </Container>
  );
};

export default Settings;

// styling
const Box = styled.div`
  display: flex;
  margin: 1.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px #f1356d6e solid;
  @media only screen and (min-width: 960px) {
    margin-bottom: 3rem;
  }
`;

const Text = styled.div`
  margin: 0 0.5rem;
  font-size: 1.5rem;
  @media only screen and (min-width: 960px) {
    font-size: 2rem;
  }
`;

const TextField = styled.div`
  margin: 0 0.5rem;
  font-size: 1.2rem;
  @media only screen and (min-width: 960px) {
    font-size: 1.7rem;
    margin-left: 2rem;
  }
`;

const Edit = styled.button`
  background-color: white;
  border: none;
  color: var(--content-color);
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  @media only screen and (min-width: 960px) {
    font-size: 1.3rem;
    margin-left: 2rem;
  }
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 1rem;
  border-radius: 5px;
  border: 2px #e0dcdc solid;
  &:focus {
    outline: 2.5px var(--content-color) solid;
  }
  @media only screen and (min-width: 960px) {
    font-size: 1.3rem;
  }
`;

const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Delete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const DeleteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
