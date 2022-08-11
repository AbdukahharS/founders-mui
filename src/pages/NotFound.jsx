import { Stack, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <Stack
      alignItems='center'
      minHeight='100vh'
      justifyContent='center'
      bgcolor='light.main'
    >
      <Typography color='primary.contrastText' fontSize='2.4rem'>
        This page is Not Found
      </Typography>
    </Stack>
  )
}

export default NotFound
