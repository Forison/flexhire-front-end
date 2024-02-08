import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'


interface LinkObject {
	label: string
	icon: IconProp
}

interface Props  {
	links: LinkObject[]
}

export default function SidebarContent({ links }: Props): JSX.Element {
  
  return (
		<>
		  {links.map((link, index) => (				
				<List sx={{ width: '80%', padding:0 }} key={index}>
					<ListItem alignItems="center">
						<ListItemText
							secondary={
							<>
								<Typography
									sx={{ color: 'white'}}
									component="span"
									variant="body2"
									color="text.primary"
								>
									<FontAwesomeIcon icon={link.icon} /> {' '}{link.label}
								</Typography>
							</>
						}/>
					</ListItem>
				</List>
		  ))}
	  </>
  )
}
