import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { 
	faCog,
  faAddressBook, 
	faAddressCard,
	faBaby,
	faCableCar,
	faCakeCandles,
	faCalculator,
	faCheese,
} from '@fortawesome/free-solid-svg-icons'
import SideBarAccordionContent from './SideBarAccordionContent'
import { Divider } from '@mui/material'


const JobSearchViewLinks = [
  {
    label: 'Opportunity',
    icon: faAddressBook
  },
  {
    label: 'Applied',
    icon: faAddressCard
  },
  {
    label: 'Screening',
    icon: faBaby
  },
  {
    label: 'Interviews',
    icon: faCableCar
  },
  {
    label: 'Offers',
    icon: faCakeCandles
  },
]

const MyAccountSettingLinks = [
  {
    label: 'Profile',
    icon: faCalculator
  },
  {
    label: 'Settings',
    icon: faCog
  },
  {
    label: 'Tutorials',
    icon: faCheese
  },
]


export default function SideBarAccordion (): JSX.Element {
  return (
    <Box>
      <AppBar position='static' className='side-bar'>
      <Accordion sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white'}} />}
          aria-controls='panel1-content'
          id='panel1-header'
          sx={{ backgroundColor: 'primary.main', color: 'white'}}
        >
          <Typography sx={{fontSize: '14px', color: 'white' }}>Job Search View</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ justifyContent: 'center', backgroundColor: 'primary.main' }}>
          <SideBarAccordionContent links={JobSearchViewLinks} />
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white'}} />}
          aria-controls='panel2-content'
          id='panel2-header'
          sx={{ backgroundColor: 'primary.main'}}
        >
          <Typography sx={{fontSize: '14px', color: 'white' }}>My Account</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ justifyContent: 'center', backgroundColor: 'primary.main' }}>
				  <SideBarAccordionContent links={MyAccountSettingLinks} />
        </AccordionDetails>
      </Accordion>
      <Divider />
      </AppBar>
    </Box>
  )
}
