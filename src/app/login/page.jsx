import { LoginForm } from '@/app/login/_components/login-form';
import { useSelector } from 'react-redux';

export default function LoginPage() {
  const test = useSelector((state) => state.auth);

  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <LoginForm />
    </div>
  );
}
