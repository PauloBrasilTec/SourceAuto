<script>
import axios from 'axios';
export default {
  methods: {
    is_null(value) {
      return value === undefined || value === null || value === "" ;
    },
    async send_request(method = '', url = '' , params_request = {} , function_request = '') {
      if (!this.is_null(method) && !this.is_null(url) && !this.is_null(function_request)) {
        const params = new URLSearchParams();
        params.append('function', function_request);
        
        if (!this.is_null(params_request)) {
          params.append('dados', JSON.stringify(params_request));
        }

        try {
          let res = null;
          if (method.toLowerCase() === 'post') {
            res = await axios.post(url, params);
          } else if (method.toLowerCase() === 'get') {
            res = await axios.get(url, { params });
          }

          if (!this.is_null(res) && !this.is_null(res.data)) {
            return res.data;
          }
        } catch (error) {
          console.error('Erro na solicitação:', error);
        }
      }
      return null;
    }

  }
}
</script>
