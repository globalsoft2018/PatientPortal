import {t} from "i18next";
//@ts-ignore

class DateTimeHelper{
    static    months:string[]= [ "jan", "feb","mar", "apr","may", "jun","jul", "aug","sep", "oct", "nov","dec"];
    static days=["Monday", "Tuesday","Wednesday" ,"Thursday","Friday","Saturday","Sunday",];
     static  dateString =( dateObj:Date)=>{

        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
       return  day + " " + t(DateTimeHelper.months.at(month-1)??"") + " " + year;
    }

    static dateFromString=(stringDate:string)=>{
        return new Date(stringDate);
    }

    static dateToString =(dateObj:Date)=> {
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        return `${year}/${month}/${day}`;
}


    static dayShortNameFromString=(date:Date)=>{
        const dayNameNumber=date.getDay();
        return t(DateTimeHelper.days.at(dayNameNumber-1)?.substring(0,3)??"");
    }

    static dayNameFromString=(date:Date)=>{
        const dayNameNumber=date.getDay();
        return t(DateTimeHelper.days.at(dayNameNumber-1)??"");
    }

    static YearFromDate=(date:Date)=>{
        return  date.getUTCFullYear();
    }

    static  dayMonthNameFromDate(date:Date){

        const month = date.getUTCMonth() + 1; //months from 1-12
        const day = date.getUTCDate();

        return  day + " " + t(this.months.at(month-1)??"");
    }

    static  dayNameDayNumberMonthNameString =( dateObj:Date)=>{

        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const dayNameNumber=dateObj.getDay();
        return  t(DateTimeHelper.days.at(dayNameNumber-1)??"") +" ,"+day + " " + t(DateTimeHelper.months.at(month-1)??"") + " " + year;
    }


}
 export default DateTimeHelper;