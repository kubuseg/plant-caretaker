import React, {useState} from 'react';
import {Text, StyleSheet, Image, View, ScrollView} from 'react-native';
import sizes from '../styles/sizes';

import PlantDetailsTemplate from './PlantDetailsTemplate';
import appColors from '../styles/appColors';
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import BackButton from '../components/BackButton';
import {useFocusEffect} from '@react-navigation/native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryTheme,
  VictoryBar,
} from 'victory-native';
import PlantsDBApi from '../services/PlantsDBApi';

const UserPlantStatistics = ({route}: any) => {
  const plantInfo = route.params.plantInfo;

  const [plantMeasurements, setPlantMeasurements] = useState();
  const [plantHistory, setPlantHistory] = useState();
  const [minDomain, setMinDomain] = useState<number>();
  const [maxDomain, setMaxDomain] = useState<number>();
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      const setPlantStats = async () => {
        const measurements = (
          await PlantsDBApi.getPlantMeasurements(plantInfo.uuid)
        ).map((m: any) => ({
          x: new Date(m.dateTime).getTime(),
          y: m.humidity,
        }));
        setPlantMeasurements(measurements);

        const history = (await PlantsDBApi.getPlantHistory(plantInfo.uuid))
          .filter((h: any) => h.watering_ml)
          .map((h: any) => ({
            x: new Date(h.dateTime).getTime(),
            y: h.watering_ml,
          }));
        setPlantHistory(history);

        setMinDomain(
          new Date(
            Math.min(
              ...measurements.map((m: any) => m.x),
              ...history.map((h: any) => h.x),
            ),
          ).getTime(),
        );
        setMaxDomain(
          new Date(
            Math.max(
              ...measurements.map((d: any) => d.x),
              ...history.map((d: any) => d.x),
            ),
          ).getTime(),
        );

        setIsDataLoaded(true);
      };
      setPlantStats();
    }, [plantInfo.uuid]),
  );

  const appHeaderText = 'Statystyki rośliny';
  const plantHeaderContents = (
    <>
      <Image style={styles.icon} source={{uri: plantInfo.image}} />
      <Text
        style={[
          homeScrollViewStyles.title,
          {
            color: '#85b493',
            marginLeft: 10,
            fontSize: 24,
          },
        ]}>
        {plantInfo.name}
      </Text>
    </>
  );

  const mainContents = isDataLoaded ? (
    <View style={{width: '100%'}}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        height={200}
        minDomain={{x: minDomain}}
        maxDomain={{x: maxDomain}}
        scale={{x: 'time'}}>
        <VictoryAxis />

        <VictoryAxis dependentAxis tickFormat={t => `${t}%`} />

        <VictoryLine
          style={{
            data: {stroke: '#85b493'},
          }}
          data={plantMeasurements}
          x={d => new Date(d.x)}
        />
      </VictoryChart>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        height={200}
        minDomain={{x: minDomain}}
        maxDomain={{x: maxDomain}}
        scale={{x: 'time'}}>
        <VictoryAxis />

        <VictoryAxis dependentAxis tickFormat={t => `${t} ml`} />

        <VictoryBar
          style={{
            data: {stroke: '#85b493'},
          }}
          barRatio={0.25}
          data={plantHistory}
          x={d => new Date(d.x)}
        />
      </VictoryChart>
    </View>
  ) : (
    <View style={{width: '100%'}}></View>
  );

  const footerContents = (
    <>
      <BackButton />
    </>
  );

  return (
    <PlantDetailsTemplate
      appHeaderText={appHeaderText}
      plantHeaderContents={plantHeaderContents}
      mainContents={mainContents}
      footerContents={footerContents}
    />
  );
};

const styles = StyleSheet.create({
  icon: homeScrollViewStyles.icon,
  picker: {
    backgroundColor: appColors.onEditGrey,
    width: sizes.screenWidth * 0.27,
    color: 'white',
  },
  button: {
    width: '50%',
    height: sizes.screenHeight * 0.05,
    backgroundColor: '#CB5757',
    marginTop: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default UserPlantStatistics;
