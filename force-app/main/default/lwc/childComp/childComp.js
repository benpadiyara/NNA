import { LightningElement,api } from 'lwc';

export default class ChildComp extends LightningElement {

    @api acc;

    handleSelect(event)
    {
        event.preventDefault();
        const selectEvent=new CustomEvent('select',
        {
            detail: this.acc.Id
        });
        this.dispatchEvent(selectEvent);
    }

}