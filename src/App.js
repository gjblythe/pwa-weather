import {AppBar, Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, Snackbar, TextField, Toolbar, Typography} from '../../pwa-weather/node_modules/@material-ui/core';
import React, {useState} from 'react';
import {fetchWeather} from './api/fetchWeather';
import './App.css';

const useStyles = makeStyles((theme) => ({
  search: {
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    width: 400,
  },
}));

export const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const handleClose = () => {
    setOpen(false);
  }

  const search = async () => {
    const data = await fetchWeather(query);
    console.log(data)
    setWeather(data);
    setQuery('');
  };
  return (
    <div>
      <AppBar position={'static'}>
        <Toolbar>
          <Typography>PWA Weather App</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth={'md'}>
          <Grid container={true} className={classes.search} alignContent={'center'}>
            <Grid item={true} xs={9}>
              <TextField 
                id={'city'}
                label={'Location(City)'}
                variant={'outlined'} 
                fullWidth={true}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && search()}
              />
            </Grid>
            <Grid item={true} xs={2}>
              <Button className={classes.button} variant={'contained'} color={'primary'} onClick={search}>Submit</Button> 
            </Grid>
          </Grid>
          {weather.main && (
            <Grid container={true} justify={'center'}>
              <Card className={classes.card}>
                <CardHeader title={weather.name}/>
                <CardContent >
                  <Typography variant={'caption'}>Temp</Typography>
                  <Typography variant={'h4'}>{Math.round(weather.main.temp)}<sup>&deg;F</sup></Typography>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                  <Typography variant={'subtitle2'}>{weather.weather[0].description.toUpperCase()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Container>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          message={`Search a location then open ChromeDevTools Network and set to 'offline' to see caching.`}
          key={'bottom' + 'center'}
        />
      </main>
    </div>
  );
};
