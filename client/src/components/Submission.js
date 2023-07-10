import { Container, Form, Input, Title, Button } from "./authentication/StyledForm";

const Submission = () => {
  return (
    <Container>
      <div>
        <Title>Submission</Title>
        <p>
          Couldn't find what you were looking for? No worries! Submit you
          request right here:
        </p>
      </div>
      <Form action="">
        <div>
          <label htmlFor="item">Name of the technology:</label>
          <input type="text" id="item" placeholder="Name of the technology" />
        </div>
        <div>
          <p>Used on:</p>
          <input type="radio" name="location" id="body" value="body" />
          <label htmlFor="body">Body</label>
          <input type="radio" name="location" id="face" value="face" />
          <label htmlFor="face">Face</label>
        </div>
        <div>
          <p>Helps with:</p>
          <input type="radio" name="location" id="location" value="body" />
          <label htmlFor="body">Body</label>
          <input type="radio" name="location" id="location" value="face" />
          <label htmlFor="face">Face</label>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="What type of technology is it, how does it work, what are the steps, etc..."
          />
        </div>
        <div>
          <label htmlFor="skin">Skin Type:</label>
          <input
            type="text"
            id="skin"
            placeholder="Can everyone use this or darker skins are more at risk?"
          />
        </div>
        <div>
          <label htmlFor="care">Before or after care:</label>
          <input
          type="text"
          id="care"
          placeholder="No downtime, careful of sun exposure, no makeup, etc..."
        />
        </div>
        <div>
          <label htmlFor="frequency">Frequency:</label>
          <input
          type="text"
          id="frequency"
          placeholder="How many treatments for how long, how long does it last, is there any maintenance treatments, etc..."
        />
        </div>
        <div>
          <label htmlFor="url">Official website to the technology:</label>
          <input
          type="text"
          id="url"
          placeholder="Link to the technology"
        />
        </div>

        <Button>Send</Button>
      </Form>
      <div>
        <p>
          Already have an account?<span>Login</span>
        </p>
        <p>
          Don't forget to read our <span>guidelines</span>.
        </p>
      </div>
    </Container>
  );
};

export default Submission;
