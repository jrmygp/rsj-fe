import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { LoginSchema } from '@/services/login/schema';
import { useLogin } from '@/services/login/hooks/useLogin';

export function LoginForm() {
  const { loginMutation, loginStatus } = useLogin();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      loginMutation({
        username: values.username,
        password: values.password,
      });
    },
  });

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              type='text'
              name='username'
              placeholder='@username'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <Label className='text-sm text-red-500'>
                {formik.errors.username}
              </Label>
            ) : null}
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
            </div>
            <Input
              id='password'
              type='password'
              name='password'
              placeholder='*******'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <Label className='text-sm text-red-500'>
                {formik.errors.password}
              </Label>
            ) : null}
          </div>
          <Button
            type='submit'
            className='mt-6 w-full'
            disabled={loginStatus === 'pending'}
          >
            {loginStatus === 'pending' ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
