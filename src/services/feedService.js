import { httpService } from './httpService';

async function query() {
	return httpService.get('feed');
}

async function addMsg(msg) {
	return httpService.post('feed/add', msg);
}

export const feedService = {
    query,
    addMsg
};
