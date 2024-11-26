import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '@/store/slices/authSlice';
import { deleteCookie } from '@/config/cookie';

export default function AvatarNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='min-w-[200px] cursor-pointer'>
        <div className='flex items-center gap-2'>
          <Label className='text-extends-darkGrey cursor-pointer'>
            <span className='text-slate-400'>Welcome Back! </span>
            {user.name}
          </Label>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <a href='/dashboard/user'>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
        </a>
        <DropdownMenuItem
          onClick={() => {
            dispatch(clearUser());
            deleteCookie();
            navigate('/');
          }}
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
