import { LightningElement,wire,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccounts from '@salesforce/apex/ParentController.getAccounts';
import style_resource from '@salesforce/resourceUrl/Style_Resource';
import {loadStyle} from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {showToast} from 'c/utils';
// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';'
const columns=[{ label: 'Id', fieldName: 'Id' },
{ label: 'Name', fieldName: 'Name'},
{ label: 'Phone', fieldName: 'Phone', type: 'phone' }];
export default class ParentComp extends NavigationMixin(LightningElement) {
    @track searchKey;
    @track accountList;
    @track error;
    @track selectedAcc;
    @track flag=false;

    styleCss=style_resource+'/style/style.css';
    //labels=json.stringify(namefield);
    columns=columns;
    /*@wire(getAccounts,{s:'$searchKey'})
    getAccountList({error,data}){
        console.log('inside wire');
        if(data)
        {
            console.log('inside data');
            this.accountList=data;
            
            console.log(JSON.stringify(data));
        }
        else if(error)
        {
            console.log('inside error');
            this.error=error;
            console.log('error'+error);
        }
    };*/

    findAccount()
    {
        getAccounts({
            s:this.searchKey
        })
        .then(result=>{
            this.accountList=result;
        })
        .catch(error=>{
            this.error=error;
        });
    }

    handleChange(event)
    {
        event.preventDefault();
        this.searchKey=event.target.value;
    }

    handleSelectRec(event)
    {
        const recordId=event.detail;
        
        this.selectedAcc=this.accountList.find(account=> account.Id=== recordId);

        const nextSelect=new CustomEvent("next",
        {
            detail: {recordId}
        });
        console.log("record id " +recordId);
        this.dispatchEvent(nextSelect);

        //this.navigationToRecordPage(recordId);
        //this.navigateToNewRecord();

        //SHOW TOAST
        const eventfortoast=new ShowToastEvent({
            title:'SUCCESS',
            variant:'success',
            message:'The event fired successfully'
        });
        this.dispatchEvent(eventfortoast);

        this.dispatchEvent(showToast('error','some error','Error Toast'));



    }

    navigationToRecordPage(record)
    {
        console.log("RECORD IS "+record);
        /*let pageReferenceRecord={
            type: 'standard__recordPage',
            attributes: {
                recordId: record,
                actionName: 'view',
            }
        };
        this[NavigationMixin.Navigate](pageReferenceRecord,true);*/


        //OR
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: record,
                actionName: 'view'
            }
        });
        console.log("completed");
    }

    navigateToNewRecord()
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            }
        });
    }
    
    renderedCallback()
    {
        if(this.flag)
        {
            return;
        }
        this.flag=true;
        Promise.all([
            loadStyle(this,this.styleCss)
        ]).then(()=>{
            console.log("Entered");
        })
        .catch(error=>{
            this.error=error;
            console.log("Error founded"+error);
        });
    }

}