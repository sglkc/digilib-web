import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Password from '@/components/Password';

export default function LoginView() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Digilib Jalan Rahmat</h1>
      <Input type="text" placeholder="Test Input" />
      <Password />
      <a href="#">lupa kata sandi</a>
      <Button onClick={() => setCount((count) => count + 1)}>
        Button {count}
      </Button>
      <p>
        Belum punya akun? <a href="#">Daftar Sekarang</a>
      </p>
    </>
  );
}
