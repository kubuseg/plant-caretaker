import {Picker} from '@react-native-picker/picker';

class PlantDetailsPickerOptions {
  static wateringIntervalOptions = Array.from(Array(31).keys()).map(m => (
    <Picker.Item key={m} label={m.toString()} value={m.toString()} />
  ));

  static fertilizationIntervalOptions = Array.from(
    {length: 30},
    (_, i) => i + 1,
  ).map(m => <Picker.Item key={m} label={m.toString()} value={m.toString()} />);

  static monthOptions = Array.from({length: 12}, (_, i) => i + 1).map(m => (
    <Picker.Item key={m} label={m.toString()} value={m.toString()} />
  ));
}

export default PlantDetailsPickerOptions;
