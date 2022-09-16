import {enforce, test, create}  from 'vest';
import got from 'got';
import FormData from 'form-data';
import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const something = formData.get('something');

    const suite = create((something: FormDataEntryValue | null) => {
      test('something', 'Please enter something', () => {
        enforce(something).isNotEmpty();
      });
    });

    const validationResult = suite(something);

    if(validationResult.hasErrors()) {
      return invalid(400, {errors: validationResult.getErrors()});
    }

    const params = new FormData();
    params.append('something', something as string);

    const response: any = await got.post('https://httpbin.org/post', {
      body: params
    }).json();

    return {
      success: response.form
    };
  }
};
