import React, { useState } from 'react';

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme
} from '@mantine/core';

import { Outlet } from 'react-router-dom';
import MainLinks from './MainLinks';
import LightDarkButton from '../DarkMode/LightDarkButton';

const Layout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 950, marginRight: -8, marginLeft: -8
          }
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={(
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="xs">
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>{/* <User /> */}</Navbar.Section>
          </Navbar>
        )}
        footer={(
          <Footer height={60} p="md">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text size="sm">© 2022 Pitang, Inc.</Text>
            </div>
          </Footer>
        )}
        header={(
          <Header height={70} p="md">
            <div style={{
              display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between'
            }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text size="lg" weight={500}>Vaccines Appointments</Text>

              <LightDarkButton />
            </div>
          </Header>
        )}
      >
        <Outlet />
      </AppShell>

    </div>
  );
};

export default Layout;
