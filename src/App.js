import {AppBar, Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextField, Toolbar, Typography} from '@material-ui/core';
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

export default () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
 
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
            <Grid item={true} md={10}>
              <TextField 
                id={'city'}
                label={'Location(City)'}
                variant={'outlined'} 
                fullWidth={true}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>
            <Grid item={true} md={2}>
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
      </main>
    </div>
  );
};
