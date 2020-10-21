import { LightningElement, track } from 'lwc';

export default class GrandParent extends LightningElement {
    @track accid;

    handleSelectR(event)
    {
        console.log("Inside grand");
        this.accid=event.detail;
    }
}