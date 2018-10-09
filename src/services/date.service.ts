import {Injectable} from '@angular/core';
import moment from 'moment';

@Injectable()
export class DateService {

    // TODO - need to check that below feilds are using in other than shipping manifest application or not
    public static readonly TIME_HH_MM_SS   = 'HH:mm:ss';
    public static readonly TIME_H_MM_A     = 'h:mm A';
    public static readonly DATE_YYYY_MM_DD = 'YYYY-MM-DD';
    public static readonly DATE_MM_DD_YYYY = 'MM/DD/YYYY';


    public static readonly DATE_TIMESTAMP = 'T00:00:00-05:00';
    
    public static readonly DATABASE_DATE_FORMAT = 'YYYY-MM-DD';
    public static readonly DATABASE_TIME_FORMAT = 'HH:mm:ss';
    public static readonly DATABASE_DATE_TIME_FORMAT = DateService.DATABASE_DATE_FORMAT + ' ' + DateService.DATABASE_TIME_FORMAT;

    public static readonly APPLICATION_DATE_FORMAT = 'MM/DD/YYYY';
    public static readonly APPLICATION_TIME_FORMAT = 'h:mm A';
    public static readonly APPLICATION_DATE_TIME_FORMAT = DateService.APPLICATION_DATE_FORMAT + ' ' + DateService.APPLICATION_TIME_FORMAT;

    private static readonly INVALID: string = 'Invalid date';

    /**
     * Given a date/time string with the specified input format, return a new date/time string with the specified output format.
     * Uses Moment.js
     * @param input the date/time input string
     * @param inputFormat how the input is formatted
     * @param outputFormat how the output should be formatted
     * @returns {string} the newly formatted date/time string, if the input is formatted correctly; null otherwise
     */
    format(input: string, inputFormat: string, outputFormat: string): string {
        let formattedDate: string = moment(input, inputFormat).format(outputFormat);
        if (formattedDate === DateService.INVALID) {
            return null;
        }
        return formattedDate;
    }

    formatDate(inputDate: Date, outputFormat: string): string {
        return moment(inputDate).format(outputFormat);
    }

    /**
     * Get the current date time.
     * @param {string} outputFormat the output format
     * @returns {string} Returns the current date time formatted in the specified output format.
     */
    currentDate(outputFormat: string): string {
        return this.formatDate(new Date(), outputFormat);
    }

    /**
     * Given the specified date time string in local time, get the date time string in UTC.
     * @param {string} localDateTime must include both the date and time in order to correctly calculate
     * @param {string} inputFormat the input format
     * @param {string} outputFormat the output format
     * @returns {string} Returns the date time string in UTC, formatted in specified output format.
     */
    getUniversalTime(localDateTime: string, inputFormat: string, outputFormat: string): string {
        let minuteOffset: number = new Date().getTimezoneOffset();
        let date = moment(localDateTime, inputFormat);
        date.add(minuteOffset, 'm');
        return date.format(outputFormat);
    }

    /**
     * Given the specified date time string in UTC, get the date time string in local time.
     * @param {string} universalDateTime must include both the date and time in order to correctly calculate
     * @param {string} inputFormat the input format
     * @param {string} outputFormat the output format
     * @returns {string} Returns the date time string in local time, formatted in specified output format.
     */
    getLocalTime(universalDateTime: string, inputFormat: string, outputFormat: string): string {
        let minuteOffset: number = new Date().getTimezoneOffset();
        let date = moment(universalDateTime, inputFormat);
        date.subtract(minuteOffset, 'm');
        return date.format(outputFormat);
    }

    /**
     * Calculates the time difference in minutes between the start time and end time.
     * @param startTime
     * @param endTime
     */
    calculateDifference(startTimeString: string, endTimeString: string, format: string): number {
        let startTime = moment(startTimeString, format);
        let endTime = moment(endTimeString, format);
        return moment.duration(endTime.diff(startTime)).asMinutes();
    }

    // Do not use the functions marked as @Deprecated

    /*
     * @Deprecated
     * Given a date string formatted as mm/dd/yyyy, return a new date string formatted as
     * yyyy-mm-dd. Requires that date is properly formatted.
     */
    convertToDate(date: string): string {
        if (!date) {
            return null;
        }
        let parts: string[] = date.split('/');
        return parts[2] + '-' + parts[0] + '-' + parts[1];
    }

    /*
     * @Deprecated
     * Given a date string formatted as yyyy-mm-dd, return a new date string formatted as
     * mm/dd/yyyy. Requires that date is properly formatted.
     */
    convertFromDate(date: string): string {
        if (!date) {
            return null;
        }
        let parts: string[] = date.split('-');
        return parts[1] + '/' + parts[2] + '/' + parts[0];
    }

    /*
     * @Deprecated
     * Given a time string formatted as HH:MM (12 hour format), return a new date string formatted as
     * HH:MM:SS (in 24 hour format). Requires that time is properly formatted.
     */
    convertCorrectTime(time: string): string {
        if (!time) {
            return null;
        }
        let part: string[] = time.split(':');

        if (part[0] !== '12' && part[1].substr(3) === 'PM') {
            part[0] = String(parseInt(part[0]) + 12);
        }
        return part[0] + ':' + part[1].substr(0, 2) + ':00';
    }
}