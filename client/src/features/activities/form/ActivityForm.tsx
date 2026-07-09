import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/share/components/TextInput";
import SelectInput from "../../../app/share/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/share/components/DateTimeInput";
import LocationInput from "../../../app/share/components/LocationInput";

export default function ActivityForm() {
  const {handleSubmit, control, reset } = useForm<ActivitySchema>({
     mode: 'onTouched',
     resolver: zodResolver(activitySchema),
  });
  const nagigate = useNavigate();
  const {id}  = useParams();
  const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);

  useEffect(() => {
    if (activity) reset({
        ...activity,
        location: {
           city: activity.city,
           venue: activity.venue,
           latitude: activity.latitude,
           longitude: activity.longitude

        }
    });
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
      const {location, ...rest} = data;
      const flattenedData = {...rest, ...location};
    try {
        if (activity) {
          updateActivity.mutate({...activity, ...flattenedData}, {
            onSuccess: () => nagigate(`/activities/${activity.id}`)
          })
        } else {
            createActivity.mutate(flattenedData, {
                onSuccess: (id) => nagigate(`/activities/${id}`)
            })
        }     
    } catch (error) {
        console.log(error);
    }
  }

  if (isLoadingActivity) return <Typography variant="h5">Loading activity...</Typography>

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">
            {activity ? 'Edit Activity' : 'Create Activity'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
            <TextInput label='Title' control={control} name='title' />
            <TextInput label='Description' control={control} name='description' multiline rows={3} />
            <Box display="flex" gap={3}>
               <SelectInput items={categoryOptions}
                  label='Category' 
                  control={control} 
                  name='category' 
            />
            <DateTimeInput label='Date' control={control} name='date' />
            </Box>           
            <LocationInput control={control} label='Enter the location' name='location' />
            <Box display='flex' gap={3} justifyContent='flex-end'>
                <Button color="inherit">Cancel</Button>
                <Button 
                    type="submit" 
                    color="success" 
                    variant="contained"
                    disabled={updateActivity.isPending || createActivity.isPending}
                >Submit</Button>
             </Box>   
        </Box>
    </Paper>)
}