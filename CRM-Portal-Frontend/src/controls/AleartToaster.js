import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AleartToaster = {

    success(log) {
        toast.dismiss()
        toast.success(log, {
            autoClose: 5000
        });
    },

    info(log) {
        toast.dismiss()
        toast.info(log, {
            autoClose: 5000
        });
    },

    warn(log) {
        toast.dismiss()
        toast.warn(log, {
            autoClose: 5000
        });
    },

    error(log) {
        toast.dismiss()
        toast.error(log, {
            autoClose: 5000
        });
    }
}

export default AleartToaster;