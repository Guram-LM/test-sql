
import UserMenu from '../user/UserMenu';
import LanguageButton from './llenguiggeButton';

const Translate = () => {



  return (
    <div className='flex gap-5 items-center'>
      <LanguageButton />
      <UserMenu />
    </div>
    
  );
};

export default Translate;