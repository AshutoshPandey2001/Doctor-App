import moment from "moment";

export const formatDateDDMMYYY = (inputDate: any) => {
    // Try to parse the input date string using different formats
    const formats = [
        'DD/MM/YYYY',
        'DD-MM-YYYY',
        'DD.MM.YYYY',
        'DD/MMM/YYYY',
        'DD-MMM-YYYY',
        'YYYY-MM-DD',
        'DD.MMM.YYYY',
        'YYYY-MM-DD[T]HH:mm',
        'YYYY-MM-DD[T]HH:mmZ',
        'DD-MM-YYYY[T]HH:mm',
        'YYYY-MM-DD[Z]'
        // Add more formats if needed
    ];

    let parsedDate = null;

    for (const formatStr of formats) {
        parsedDate = moment(inputDate, formatStr, true);
        if (parsedDate.isValid()) {
            // Format the date as DD/MM/YYYY
            const formatWithTime = formatStr.includes('HH:mm');
            const format = formatWithTime ? 'DD/MM/YYYY hh:mm A' : 'DD/MM/YYYY';
            const utcFormattedDate = formatWithTime ? parsedDate.utc().format(format) : parsedDate.format(format);
            return utcFormattedDate;
            // return parsedDate.format(format);
        }
    }

    // Return empty string if the input date couldn't be parsed
    return '';
};