import { ChangeSenhaFuncionario } from './changeSenhaFuncionario';

const POST_ENDPOINT = 'http://192.168.1.132:8080/api/colaboradores/updateSenha';

module.exports = {
  post: jest.fn((url) => {
    switch (url) {
      case POST_ENDPOINT:
        return Promise.resolve({ 
            "senhaAntiga":"12345",
            "senhaNova": "1234"
        },{
            headers:{
                'id':'28A5B171C9FF4FBFB4BC0481C0BD0435',
                'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyOEE1QjE3MUM5RkY0RkJGQjRCQzA0ODFDMEJEMDQzNSJ9.T4K4br5kaEboh4UIl_gkhYi3FcMD1Wk_bIcQWVv-tRc'
            }  
        });
        
    }
  })
};