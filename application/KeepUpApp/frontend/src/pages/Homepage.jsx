import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../components/Homepage/Navbar";
import note from "../assets/note.png";
import Orb from "../components/Orb/Orb";
import { useMemo } from "react";

//This function contains all the details to be displayed on the homepage along with a brief description of the app.

export default function Homepage() {
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);
  return (
    <Box padding={8}>
      {orbMemo}
      <Image position={"absolute"} right={0} w={500} src={note} />
      <Heading mt={16} textAlign={"start"} size={"4xl"}>
        KeepUpApp
      </Heading>
      <Text mt={8} maxW={"50%"} textAlign={"justify"}>
        Hello Guys!!! Welsome to the "Keep Up App". This app was developed by
        Csc 648-Section04-Team01. {"\n"}
        One major but common problem induced by the fast moving lifestyle is
        stress and as a result, forgetfulness. We have too many things to be
        done in our professional, personal and social lives parallelly everyday
        that it is hard to rely solely on ones memory to keep a track of things.
        Our application, “KeepUp – Keep up with your daily tasks, expenses and
        stress”, provides a solution to this by allowing you to add necessary
        notes, keep track of your income and expenditure. Our app not only helps
        to keep up with daily activities but also helps to keep up with stress.
        The relaxer feature guides the users on how various relaxation exercises
        could be done anytime, anywhere to maintain calmness and be more
        efficient during stressful times. Overall, the KeepUp application is a
        one stop solution to three different but commonly encountered problems.
        This is useful to almost all people irrespective of age, profession and
        gender. The added advantage is that it is easy to use by those who
        aren’t tech savvy as everything could be accessed with just one
        click/tap.
      </Text>
    </Box>
  );
}
