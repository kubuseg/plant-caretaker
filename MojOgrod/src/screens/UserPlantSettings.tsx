import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import sizes from '../styles/sizes';
import PlantDetailsSection from '../components/PlantDetailsSection';
import {useNavigation} from '@react-navigation/native';

import PlantDetailsTemplate from './PlantDetailsTemplate';
import DataManager from '../services/DataManager';
import LoadingScreen from './LoadingScreen';
import appColors from '../styles/appColors';
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import BackButton from '../components/BackButton';
import FooterTextButton from '../components/FooterTextButton';
import PlantDetailsPickerOptions from '../services/PlantDetailsPickerOptions';
import JsonFileManager from '../services/JsonFileManager';
import PlantsDBApi from '../services/PlantsDBApi';
import {useFocusEffect} from '@react-navigation/native';

const UserPlantSettings = ({route}: any) => {
  const plantInfo = route.params.plantInfo;

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [plantName, setPlantName] = useState(plantInfo.name);

  const [wateringInterval, setWateringInterval] = useState(
    parseInt(plantInfo.wateringIntervalInDays),
  );
  const [fertilizationInterval, setFertilizationInterval] = useState(
    parseInt(plantInfo.fertilizationIntervalInWeeks),
  );
  const [fMonthStart, setFMonthStart] = useState(
    parseInt(plantInfo.fertilizationMonthBetweenCondition[0]),
  );
  const [fMonthEnd, setFMonthEnd] = useState(
    parseInt(plantInfo.fertilizationMonthBetweenCondition[1]),
  );

  const [waterNeedsType, setWaterNeedsType] = useState(
    plantInfo.waterNeedsType,
  );

  const [flowerpotSize, setFlowerpotSize] = useState(
    plantInfo.flowerpotSize ?? 'SMALL',
  );

  const [wateringLines, setWateringLines] = useState<any[]>([]);
  const disconnectedLineVal = -1;
  const initWateringLine = plantInfo.wateringLine ?? disconnectedLineVal;
  const [wateringLine, setWateringLine] = useState<any>(initWateringLine);

  useFocusEffect(
    React.useCallback(() => {
      const readController = async () => {
        const mc = await JsonFileManager.read('Controller');
        setWateringLines(mc.wateringLines);
      };
      readController();
    }, []),
  );

  async function deletePlant() {
    setIsLoading(true);
    await DataManager.deletePlant(plantInfo.uuid.toString());
    if (plantInfo.wateringLine !== disconnectedLineVal) {
      const mc = await JsonFileManager.read('Controller');
      await PlantsDBApi.deletePlantFromMicrocontroller(
        mc.id,
        plantInfo.wateringLine.toString(),
      );
    }
    setIsLoading(false);
    navigation.navigate('Home' as never);
  }

  const handleMicrocontroller = async (mc: any, userId: string) => {
    if (wateringLine !== disconnectedLineVal) {
      await PlantsDBApi.updatePlantOnMicrocontroller(
        mc.id,
        wateringLine.toString(),
        userId,
        plantInfo.uuid,
      );
    }

    if (wateringLine === initWateringLine) {
      return;
    }
    if (wateringLine === disconnectedLineVal) {
      await PlantsDBApi.deletePlantFromMicrocontroller(
        mc.id,
        initWateringLine.toString(),
      );
    } else if (initWateringLine === disconnectedLineVal) {
      await PlantsDBApi.addPlantToMicrocontroller(
        mc.id,
        wateringLine.toString(),
        userId,
        plantInfo.uuid,
      );
    } else {
      await PlantsDBApi.deletePlantFromMicrocontroller(
        mc.id,
        initWateringLine.toString(),
      );
      await PlantsDBApi.addPlantToMicrocontroller(
        mc.id,
        wateringLine.toString(),
        userId,
        plantInfo.uuid,
      );
    }
  };

  async function onPressSave() {
    plantInfo.name = plantName;
    plantInfo.wateringIntervalInDays = wateringInterval;
    plantInfo.fertilizationIntervalInWeeks = fertilizationInterval;
    plantInfo.fertilizationMonthBetweenCondition[0] = fMonthStart;
    plantInfo.fertilizationMonthBetweenCondition[1] = fMonthEnd;
    plantInfo.wateringLine = wateringLine;
    plantInfo.flowerpotSize = flowerpotSize;
    plantInfo.waterNeedsType = waterNeedsType;

    setIsLoading(true);
    try {
      const mc = await JsonFileManager.read('Controller');
      const userId = await JsonFileManager.read('userId');
      await DataManager.savePlantInfo(plantInfo);
      handleMicrocontroller(mc, userId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.navigate('Home' as never);
    }
  }

  const appHeaderText = 'Edycja rośliny';
  const plantHeaderContents = (
    <>
      <Image style={styles.icon} source={{uri: plantInfo.image}} />
      <TextInput
        value={plantName}
        onChangeText={setPlantName}
        style={[
          homeScrollViewStyles.title,
          {
            color: 'white',
            marginLeft: 6,
            backgroundColor: appColors.onEditGrey,
          },
        ]}
        maxLength={28}
      />
    </>
  );

  const DeleteButton = (): JSX.Element => {
    if (plantInfo.uuid) {
      return (
        <TouchableOpacity style={styles.button} onPress={deletePlant}>
          <Text style={styles.buttonText}>Usuń roślinę</Text>
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  };

  const WateringLineSection = (): JSX.Element => {
    if (plantInfo.uuid) {
      return (
        <PlantDetailsSection title={'Linia podlewająca: '}>
          <Picker
            selectedValue={wateringLine?.toString()}
            onValueChange={itemValue => setWateringLine(parseInt(itemValue))}
            style={{
              backgroundColor: appColors.onEditGrey,
              width: sizes.screenWidth * 0.3,
              color: 'white',
            }}>
            {Array.from([
              <Picker.Item
                label="Brak"
                key={disconnectedLineVal}
                value={disconnectedLineVal.toString()}
              />,
            ]).concat(
              wateringLines.map(lineNo => (
                <Picker.Item
                  key={lineNo}
                  label={lineNo.toString()}
                  value={lineNo.toString()}
                />
              )),
            )}
          </Picker>
        </PlantDetailsSection>
      );
    } else {
      return <></>;
    }
  };

  const mainContents = (
    <ScrollView style={{width: '100%'}}>
      <PlantDetailsSection title={'Czas między podlewaniem (dni):'}>
        <Picker
          selectedValue={wateringInterval.toString()}
          onValueChange={itemValue => setWateringInterval(parseInt(itemValue))}
          style={styles.picker}>
          {PlantDetailsPickerOptions.wateringIntervalOptions}
        </Picker>
      </PlantDetailsSection>

      <PlantDetailsSection title={'Czas między nawożeniem (tygodnie):'}>
        <Picker
          selectedValue={fertilizationInterval.toString()}
          onValueChange={itemValue =>
            setFertilizationInterval(parseInt(itemValue))
          }
          style={styles.picker}>
          {PlantDetailsPickerOptions.fertilizationIntervalOptions}
        </Picker>
      </PlantDetailsSection>

      <PlantDetailsSection title={'Miesiące nawożenia: '}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Picker
            selectedValue={fMonthStart.toString()}
            onValueChange={itemValue => setFMonthStart(parseInt(itemValue))}
            style={styles.picker}>
            {PlantDetailsPickerOptions.monthOptions}
          </Picker>
          <Text style={{marginHorizontal: 5}}>-</Text>
          <Picker
            selectedValue={fMonthEnd.toString()}
            onValueChange={itemValue => setFMonthEnd(parseInt(itemValue))}
            style={styles.picker}>
            {PlantDetailsPickerOptions.monthOptions}
          </Picker>
        </View>
      </PlantDetailsSection>

      <PlantDetailsSection title={'Zapotrzebowanie na wodę'}>
        <Picker
          selectedValue={waterNeedsType}
          onValueChange={itemValue => setWaterNeedsType(itemValue)}
          style={{
            backgroundColor: appColors.onEditGrey,
            width: sizes.screenWidth * 0.35,
            color: 'white',
          }}>
          {[
            <Picker.Item label="Małe" key={0} value={'LOW'} />,
            <Picker.Item label="Średnie" key={1} value={'MEDIUM'} />,
            <Picker.Item label="Duże" key={2} value={'HIGH'} />,
          ]}
        </Picker>
      </PlantDetailsSection>

      <PlantDetailsSection title={'Wielkość Doniczki'}>
        <Picker
          selectedValue={flowerpotSize}
          onValueChange={itemValue => setFlowerpotSize(itemValue)}
          style={{
            backgroundColor: appColors.onEditGrey,
            width: sizes.screenWidth * 0.35,
            color: 'white',
          }}>
          {[
            <Picker.Item label="Mała" key={0} value={'SMALL'} />,
            <Picker.Item label="Średnia" key={1} value={'MEDIUM'} />,
            <Picker.Item label="Duża" key={2} value={'LARGE'} />,
          ]}
        </Picker>
      </PlantDetailsSection>
      <WateringLineSection />
      <DeleteButton />
    </ScrollView>
  );

  const footerContents = (
    <>
      <BackButton />
      <FooterTextButton text="ZAPISZ" onPress={onPressSave} />
    </>
  );

  if (!isLoading) {
    return (
      <PlantDetailsTemplate
        appHeaderText={appHeaderText}
        plantHeaderContents={plantHeaderContents}
        mainContents={mainContents}
        footerContents={footerContents}
      />
    );
  }

  return <LoadingScreen />;
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
});

export default UserPlantSettings;
