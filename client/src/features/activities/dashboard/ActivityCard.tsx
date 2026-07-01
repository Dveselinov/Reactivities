import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/utils/utils";

type Props = {
  activity: Activity;
}

export default function ActivityCard({activity}: Props) {
const isHost = false; // Replace with actual logic to determine if the user is the host
const isGoing = false; // Replace with actual logic to determine if the user is going
const label = isHost ? 'You are hosting this activity' : 'You are going to this activity';
const isCancelled = false; // Replace with actual logic to determine if the activity is cancelled
const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

  return (
    <Card elevation={3} sx={{borderRadius: 3}}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <CardHeader 
          avatar={<Avatar sx={{height: 80, width: 80}}/>} 
          title={activity.title}
          titleTypographyProps={{
            fontWeight: 'bold',
            fontSize: 20
          }}
          subheader={          
            <>
             Hosted by {' '} <Link to={'/profile/dveselinov'}></Link>
            </>
          }
        />
        <Box display='flex' flexDirection='column'  gap={2} mr={2}>
          {(isHost || isGoing) && <Chip label={label} color={color} variant='outlined' sx={{borderRadius: 2}}/> }
          {isCancelled && <Chip label='Cancelled' color='error' sx={{borderRadius: 2}}/>}
        </Box>
      </Box>

      <Divider sx={{mb: 3}}/>

      <CardContent sx={{p: 0}}>
          <Box display='flex' alignItems='center' mb={2} px={2}>
            <Box display='flex' flexGrow={0} alignItems='center'>
                <AccessTime sx={{mr: 1}} />
                <Typography variant="body2" noWrap>
                  {formatDate(activity.date)}
                </Typography>
            </Box>
              <Place sx={{mr: 1, ml: 3}} />
              <Typography variant="body2">{activity.venue}</Typography>
          </Box>
          <Divider />
          <Box display='flex' sx={{backgroundColor: 'grey.200', py: 3, pl: 3}}>
              Attendees go here
          </Box>
      </CardContent>
      <CardContent sx={{ pb: 2}}>
            <Typography variant="body2" >
              {activity.description}
            </Typography>
                <Button 
                  component={Link} 
                  to={`/activities/${activity.id}`} 
                  size="medium" 
                  variant="contained" 
                  sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3}}
                >
                    View
                </Button>      
      </CardContent>
    </Card>
  )
}
