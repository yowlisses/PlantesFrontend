import React from 'react';
import {useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';

import {auth} from 'auth/auth';
import {ItemForm} from 'form/ItemForm';
import {useAlert} from 'alert/AlertContext';
import {BackButton} from 'common/BackButton';
import {formatToEdit} from 'edit/formatToEdit';
import {EditBackAlert} from 'edit/EditBackAlert';
import {updatePlantInfo} from './updatePlantInfo';
import {Observer} from 'mobx-react-lite';

export function EditScreen({route}) {
  const {showAlert} = useAlert();

  const queryClient = useQueryClient();

  const {item} = route.params;

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm();

  async function onSubmit(value: ItemFormData) {
    try {
      const res = await updatePlantInfo(item.id, value);
      console.error(res);
      // navigate('ShowItem', {item: res.data});
      queryClient.invalidateQueries('plants');
      queryClient.invalidateQueries(['user', 'plants', auth.user?.id]);
      // reset();
    } catch (err) {
      console.error(err?.response || err);
    }
  }

  function onBackPress() {
    showAlert(<EditBackAlert />);
  }

  return (
    <Observer>
      {() => (
        <ItemForm
          reset={reset}
          title="Editar"
          errors={errors}
          control={control}
          isDirty={isDirty}
          onSubmit={onSubmit}
          item={formatToEdit(item)}
          handleSubmit={handleSubmit}
          headerLeft={<BackButton onPress={onBackPress} />}
        />
      )}
    </Observer>
  );
}
