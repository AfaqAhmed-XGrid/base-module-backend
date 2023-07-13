import { toast } from 'react-hot-toast';

const showToast = ({ message, type }: {message: string, type: 'success' | 'error'}) => {
  if (type === 'error') {
    toast.error(message, {
      duration: 3000,
      position: 'bottom-center',
      ariaProps: {
        'role': 'status',
        'aria-live': 'polite',
      },
    });
    return;
  }
  toast.success(message, {
    duration: 3000,
    position: 'bottom-center',
    ariaProps: {
      'role': 'status',
      'aria-live': 'polite',
    },
  });
  return;
};

export default showToast;
