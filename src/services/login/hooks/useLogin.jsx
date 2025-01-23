import { useLoginMutation } from '../api/useLoginMutation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@/config/cookie';
import { useToast } from '@/hooks/use-toast';

export const useLogin = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: loginMutation, status: loginStatus } = useLoginMutation({
    onSuccess: async (res) => {
      const token = res.data.data.token;

      const userData = {
        name: res.data.data.name,
        username: res.data.data.username,
        role: res.data.data.user_role,
      };
      await setCookie(token);

      dispatch(setUser(userData));

      navigate('/radix-logistics/dashboard');
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: 'Error',
        description: err.response.data.error,
        variant: 'destructive',
      });
    },
  });

  return { loginMutation, loginStatus };
};
