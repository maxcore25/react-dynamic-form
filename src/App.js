import {
  Button,
  Card,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([]);
  const toast = useToast();

  const handleChangeTeamName = e => {
    setTeamName(e.target.value);
  };

  const handleAddMember = () => {
    setMembers([...members, { id: +new Date(), role: '' }]);
  };

  const handleChangeRole = (id, e) => {
    setMembers(
      members.map(member =>
        member.id === id ? { ...member, role: e.target.value } : member
      )
    );
  };

  const handleDeleteMember = id => {
    const updatedMembersList = members.filter(member => member.id !== id);
    setMembers(updatedMembersList);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ teamName, members });
    setTeamName('');
    setMembers([]);
    toast({
      title: `Team "${teamName}" created`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Center height='100vh' p={4}>
      <Card maxWidth={500} flex={1} p={6} boxShadow='2xl'>
        <form onSubmit={handleSubmit}>
          <CardHeader p={0} mb={4} fontWeight={700} fontSize={32}>
            <Center>Dynamic Form</Center>
          </CardHeader>
          <FormControl mb={4}>
            <FormLabel>Team name</FormLabel>
            <Input
              type='text'
              value={teamName}
              onChange={handleChangeTeamName}
              required
              autoFocus
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Members</FormLabel>
            {members.map(member => (
              <Flex key={member.id} gap={2} py={2}>
                <Input
                  type='text'
                  placeholder='role'
                  value={member.role}
                  onChange={e => handleChangeRole(member.id, e)}
                  required
                  autoFocus
                />
                <Button
                  colorScheme='red'
                  margin='0 auto'
                  onClick={() => handleDeleteMember(member.id)}>
                  x
                </Button>
              </Flex>
            ))}
          </FormControl>
          <Flex p={4}>
            <Button
              colorScheme='blue'
              margin='0 auto'
              onClick={handleAddMember}>
              +
            </Button>
          </Flex>
          <Button type='submit' colorScheme='blue' width='full'>
            Submit
          </Button>
        </form>
      </Card>
    </Center>
  );
}

export default App;
