import axios from '../../core/axios';

export default {
  get: () => axios.get('/places'),
  add: values => axios.post('/places', values),
  show: id => axios.get('/places/' + id),
};
