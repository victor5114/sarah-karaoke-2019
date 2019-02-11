import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';

export const resourcePath = 'api/users{/id}/';

axios
  .request({ url: 'api/users{/id}/', method: 'options' })
  .then((res: AxiosResponse) => {
    console.log(res);
  });
