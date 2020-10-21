public without sharing class ParentController {
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> getAccounts(String s){
        String key='%'+s+'%';
        String query='select id,name,phone from account where name like :key';
        //List<account> acclist=[select id,name,phone from account where name like '%b%'];
        return Database.query(query);
        //return acclist;
    }

    

}