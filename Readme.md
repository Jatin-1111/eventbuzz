graph TB
subgraph Core Features
ED[Event Discovery] --> RM[Registration Management]
RM --> AM[Attendance Module]
ED --> RES[Resource Management]
end

    subgraph User Management
        AUTH[Authentication] --> ROLES[Role Management]
        ROLES --> PERM[Permissions]
    end

    subgraph Analytics Engine
        AM --> METRICS[Engagement Metrics]
        METRICS --> INSIGHTS[Analytics Dashboard]
        METRICS --> REPORTS[Reports Generation]
    end

    subgraph Communication Hub
        NOTIF[Notification System] --> EMAIL[Email Service]
        NOTIF --> PUSH[Push Notifications]
        NOTIF --> SMS[SMS Alerts]
    end

    subgraph Integration Layer
        CAL[Calendar Integration] --> ED
        AUTH --> SSO[Single Sign-On]
        METRICS --> EXP[Data Export]
    end

    style Core Features fill:#e1f5fe
    style User Management fill:#fff3e0
    style Analytics Engine fill:#f3e5f5
    style Communication Hub fill:#e8f5e9
    style Integration Layer fill:#fce4ec
