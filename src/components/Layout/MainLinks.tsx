/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  CalendarTime,
  Search
} from 'tabler-icons-react';
import {
  ThemeIcon, UnstyledButton, Group, Text
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}
const MainLink = ({
  icon, color, label, path
}: MainLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const routes = [
  {
    icon: <CalendarTime size={16} />,
    color: 'blue',
    label: 'Register',
    path: '/'
  },
  {
    icon: <Search size={16} />,
    color: 'teal',
    label: 'Appointments',
    path: '/appointments'
  }
];

const MainLinks = () => {
  const links = routes.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};

export default MainLinks;
