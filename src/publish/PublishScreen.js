import {TextInput} from 'form/TextInput';
import {useObserver} from 'mobx-react-lite';
import {FooterNavigationLayout} from 'navigation/FooterNavigationLayout';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomHeader} from './CustomHeader';
import {FinishButton} from './FinishButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {IntInput} from 'form/IntInput';

export function PublishScreen() {
  const name = useRef(null);
  const amount = useRef(null);

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .required('por favor escreva o nome')
      .min(3, 'por favor, pelo menos 3 letras'),
    amount: Yup.number(),
  });

  return (
    <Formik
      onSubmit={values => {
        console.error(values);
      }}
      initialValues={{name: '', amount: ''}}
      validationSchema={FormSchema}>
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <FooterNavigationLayout selected="Publish">
          <CustomHeader title="Publicar" right={<FinishButton />} />
          <ScrollView style={styles.container}>
            <TextInput
              ref={name}
              label="Nome"
              maxLength={32}
              value={values.name}
              onChangeText={handleChange('name')}
              error={touched.name && errors.name}
              onBlur={() => setFieldTouched('name', true)}
            />
            <IntInput
              ref={amount}
              label="Quantidade"
              value={values.amount}
              onChangeText={handleChange('amount')}
              error={touched.amount && errors.amount}
              onBlur={() => setFieldTouched('amount', true)}
            />
          </ScrollView>
        </FooterNavigationLayout>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
  },
});
