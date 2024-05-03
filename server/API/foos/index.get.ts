import _ from 'lodash';
import type { UserType } from '~/server/models/User.model';

export default defineEventHandler(async (e) => {
  try {
    const user: UserType | null = await User.findOne({});
    console.log({user})
    const response = {
      user
    }
    return response;
  } catch (error) {
    console.log({
      error
    });
  }
});
