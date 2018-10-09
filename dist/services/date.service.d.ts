export declare class DateService {
    static readonly TIME_HH_MM_SS: string;
    static readonly TIME_H_MM_A: string;
    static readonly DATE_YYYY_MM_DD: string;
    static readonly DATE_MM_DD_YYYY: string;
    static readonly DATE_TIMESTAMP: string;
    static readonly DATABASE_DATE_FORMAT: string;
    static readonly DATABASE_TIME_FORMAT: string;
    static readonly DATABASE_DATE_TIME_FORMAT: string;
    static readonly APPLICATION_DATE_FORMAT: string;
    static readonly APPLICATION_TIME_FORMAT: string;
    static readonly APPLICATION_DATE_TIME_FORMAT: string;
    private static readonly INVALID;
    /**
     * Given a date/time string with the specified input format, return a new date/time string with the specified output format.
     * Uses Moment.js
     * @param input the date/time input string
     * @param inputFormat how the input is formatted
     * @param outputFormat how the output should be formatted
     * @returns {string} the newly formatted date/time string, if the input is formatted correctly; null otherwise
     */
    format(input: string, inputFormat: string, outputFormat: string): string;
    formatDate(inputDate: Date, outputFormat: string): string;
    /**
     * Get the current date time.
     * @param {string} outputFormat the output format
     * @returns {string} Returns the current date time formatted in the specified output format.
     */
    currentDate(outputFormat: string): string;
    /**
     * Given the specified date time string in local time, get the date time string in UTC.
     * @param {string} localDateTime must include both the date and time in order to correctly calculate
     * @param {string} inputFormat the input format
     * @param {string} outputFormat the output format
     * @returns {string} Returns the date time string in UTC, formatted in specified output format.
     */
    getUniversalTime(localDateTime: string, inputFormat: string, outputFormat: string): string;
    /**
     * Given the specified date time string in UTC, get the date time string in local time.
     * @param {string} universalDateTime must include both the date and time in order to correctly calculate
     * @param {string} inputFormat the input format
     * @param {string} outputFormat the output format
     * @returns {string} Returns the date time string in local time, formatted in specified output format.
     */
    getLocalTime(universalDateTime: string, inputFormat: string, outputFormat: string): string;
    /**
     * Calculates the time difference in minutes between the start time and end time.
     * @param startTime
     * @param endTime
     */
    calculateDifference(startTimeString: string, endTimeString: string, format: string): number;
    convertToDate(date: string): string;
    convertFromDate(date: string): string;
    convertCorrectTime(time: string): string;
}
