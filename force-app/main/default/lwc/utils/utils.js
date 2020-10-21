import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const showToast=(variant,title,message)=>{
    const showevent=new ShowToastEvent({
        title:title,
        variant: variant,
        message: message
    });
    return showevent;
}

export {showToast};