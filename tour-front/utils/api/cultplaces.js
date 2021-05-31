import axios from '../../core/axios';

export default {
  get: () => axios.get('/cultplaces'),
  add: values => axios.post('/cultplaces', values),
  show: id => axios.get('/cultplaces/' + id),
};
