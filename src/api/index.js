import axios from 'axios';
import qs from 'qs';

export const urls = {
    users: {
        list: '//api.github.com/users',
        user: id => `//api.github.com/users/${id}`
    }
};

class ApiClient {

    async getUsersList() {

        const users_list = await this.request( 'get', urls.users.list);

        return users_list;
    }


    async request(method, url, data, params) {
        let response;

        try {
            response = await axios({
                method,
                url,
                data,
                params,
                paramsSerializer(params) {
                    return qs.stringify(params, {arrayFormat: 'brackets'})
                },
            });
        } catch (e) {
            throw e;
        }

        return response.data;
    }
}

export default new ApiClient();