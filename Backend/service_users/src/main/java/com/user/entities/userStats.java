package com.user.entities;

import java.util.Date;

public class userStats {
    private Date date;
    private long count;

    public userStats(Date date, long count) {
        this.date = date;
        this.count = count;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}

