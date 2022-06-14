import React from 'react'

import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

export interface TabPanelItem {
  title: string
  component: React.ReactNode
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...a11yProps(index, 'panel')}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: any, type: 'tab' | 'panel' = 'tab') {
  return type === 'tab'
    ? {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      }
    : {
        id: `simple-tabpanel-${index}`,
        'aria-labelledby': `simple-tab-${index}`,
      }
}

export const SimpleTabs: React.FC<{ tabs: TabPanelItem[] }> = props => {
  const [value, setValue] = React.useState(0)
  const theme = useTheme()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        {props.tabs.map((tab, index) => (
          <Tab
            key={`simple-tabs-${index}`}
            label={tab.title}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {props.tabs.map((tab, index) => {
        return (
          <TabPanel
            key={`simple-tabs-panel-${index}`}
            value={value}
            index={index}
          >
            {tab.component}
          </TabPanel>
        )
      })}
    </Box>
  )
}
