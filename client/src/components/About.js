import { styled } from "styled-components";

const About = () => {
  return (
    <Container>
      <Title>About</Title>
      <Text>
        Welcome to NAME, an online community dedicated to connecting individuals
        with a passion for professional skin care machines. This is a platform
        where like-minded enthusiasts can freely express their opinions, share
        experiences, and review various machines without the influence of biased
        advertisements or opinions associated with clinics. Our goal is to
        foster a supportive and knowledgeable community that empowers
        individuals to make informed decisions about their skin care routines.
        At NAME, we understand the importance of finding reliable information
        and unbiased reviews when it comes to professional skin care machines.
        Many individuals are interested in investing in these advanced devices
        to enhance their skin care regimens, but often find it challenging to
        navigate through marketing strategies and promotional content that may
        cloud their judgment. Our community was created to bridge this gap by
        providing a platform where users can share authentic and transparent
        experiences with professional skin care machines. Whether you're a
        professional aesthetician, a skincare enthusiast, or someone looking to
        explore the world of advanced skin care technologies, you'll find a
        welcoming space here.{" "}
      </Text>
      <SecondaryHeadline>Our Integrity</SecondaryHeadline>
      <Text>
        We do not allow advertisements or sponsorships from manufacturers or
        clinics, ensuring that all content on our platform is driven purely by
        the experiences and opinions of our community members. This approach
        allows us to maintain integrity and provide objective information to our
        users. Joining our community is easy and free. Simply create an account,
        and you'll gain access to a platform where your voice can be heard. We
        encourage you to contribute, share your experiences. Thank you for
        choosing NAME Together, we can build a vibrant and trusted resource that
        empowers individuals to achieve their skincare goals with confidence.
      </Text>
      <SecondaryHeadline>Our Guidelines</SecondaryHeadline>
      <Text>
        Website Guidelines: Comment and Account Moderation At [Website Name], we
        strive to maintain a positive and respectful community for all users. To
        ensure a safe and valuable experience, our administrators have the
        authority to remove comments or user accounts if they are deemed
        inappropriate or violate our guidelines. Here are some examples of
        instances where such action may be taken:
      </Text>
      <Text>
        <ol type="1">
          <Exemples>
            <Number>1</Number> Hate speech and discrimination: Comments or
            accounts that promote hate speech, discrimination, or any form of
            prejudice towards individuals or groups based on race, ethnicity,
            religion, gender, sexual orientation, or any other protected
            characteristic will not be tolerated. Example: A comment using
            derogatory language or slurs towards a specific racial or ethnic
            group.
          </Exemples>
          <Exemples>
            <Number>2</Number> Offensive or abusive behavior: Content that is
            offensive, abusive, harassing, or threatening towards other users or
            administrators will be removed. We prioritize maintaining a
            respectful environment where everyone feels safe to express their
            opinions. Example: Personal attacks, name-calling, or threats
            directed at another user or administrator.
          </Exemples>
          <Exemples>
            <Number>3</Number> Spam or self-promotion: Excessive self-promotion,
            spam, or irrelevant content that distracts from the purpose of the
            community will be deleted. We encourage users to contribute
            meaningful and relevant discussions. Example: Repeatedly posting
            links or advertisements for unrelated products or services.
          </Exemples>
          <Exemples>
            <Number>4</Number> Inappropriate or explicit content: Content that
            includes explicit language, graphic images, or adult material is not
            permitted. Our community should be a place where users of all ages
            can comfortably engage in conversations. Example: Sharing explicit
            images or using explicit language in a comment.
          </Exemples>
          <Exemples>
            <Number>5</Number> Violation of intellectual property: Posting
            copyrighted material without permission or engaging in any form of
            intellectual property infringement is strictly prohibited. Example:
            Uploading images, videos, or text that infringe upon someone else's
            copyright.
          </Exemples>
          <Exemples>
            <Number>6</Number> Violation of community guidelines: Failure to
            comply with the community guidelines, terms of service, or other
            established rules set by the website may result in comment removal
            or account suspension. Example: Continuously disregarding warnings
            and repeatedly violating the guidelines despite previous moderation
            actions.
          </Exemples>
        </ol>
      </Text>
      <Text>
        Please note that the above examples are not exhaustive, and the
        administrators retain the discretion to evaluate each situation
        individually. The decision to remove a comment or suspend an account
        will be based on the context, severity, and consistency with our
        guidelines. We value the participation of our community members and
        encourage open and constructive discussions. By adhering to these
        guidelines, we can create an inclusive and informative platform for all
        users to enjoy.
      </Text>
    </Container>
  );
};

export default About;

const Container = styled.div`
  margin: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1.5rem 0;
`;

const Text = styled.p`
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  line-height: 1.7rem;
  margin-bottom: 1.5rem;
`;

const SecondaryHeadline = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 0.7rem;
`;

const Exemples = styled.li`
  margin-bottom: 0.7rem;
`;

const Number = styled.span`
  color: var(--content-color);
  font-size:2rem;
`;
