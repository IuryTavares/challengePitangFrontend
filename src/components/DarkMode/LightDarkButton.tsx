import React from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

const LightDarkButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={16} /> : <MoonStars size={16} />}
    </ActionIcon>
  );
};

export default LightDarkButton;
