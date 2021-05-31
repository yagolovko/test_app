import axios from '../../core/axios';

export default {
  get: () => axios.get('/tours'),
  remove: id => axios.delete('/tours/' + id),
  add: values => axios.post('/tours', values)
};
