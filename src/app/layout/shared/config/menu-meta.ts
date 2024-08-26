import { MenuItem } from '../models/menu.model';

// menu items for vertcal and detached layout
const MENU_ITEMS: MenuItem[] = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    
    {
        key: 'ecommerce-products',
        label: 'Liste des objets',
        link: '/apps/objet/liste-objets',
        icon: 'box',
    },
    {
        key: 'apps-chat',
        label: 'Chat',
        isTitle: false,
        icon: 'message-square',
        link: '/apps/chat',
    },
    {
        key: 'ecommerce-dashboard',
        label: 'Carte',
        link: '/apps/objet/map',
        icon: 'map',
    },
    {
        key: 'ecommerce-products-edit',
        label: 'Ajouter un objet',
        link: '/apps/objet/products-edit',
        icon: 'add',
    },
    {
        key: 'ecommerce-orders',
        label: 'Liste des propositions',
        link: '/apps/objet/proposition',
        icon: 'list',
    },
    {
        key: 'crm-opportunities',
        label: 'Mes objets',
        link: '/apps/crm/opportunities',
        icon: 'list'
    }
    
    

];

// menu items for two column menu layout 
const TWO_COl_MENU_ITEMS: MenuItem[] = [
    {
        key: 'ecommerce-products',
        label: 'Liste des objets',
        link: '/apps/objet/liste-objets',
        icon: 'box',
    },
    {
        key: 'apps-chat',
        label: 'Chat',
        isTitle: false,
        icon: 'message-square',
        link: '/apps/chat',
    },
    {
        key: 'ecommerce-dashboard',
        label: 'Carte',
        link: '/apps/objet/map',
        icon: 'map',
    },
    {
        key: 'ecommerce-products-edit',
        label: 'Ajouter un objet',
        link: '/apps/objet/products-edit',
        icon: 'add',
    },
    {
        key: 'ecommerce-orders',
        label: 'Liste des propositions',
        link: '/apps/objet/proposition',
        icon: 'list',
    },
    
    {
        key: 'apps-crm',
        label: 'CRM',
        isTitle: false,
        icon: 'users',
        collapsed: true,
        children: [
            {
                key: 'crm-dashboard',
                label: 'Dashboard',
                link: '/apps/crm/dashboard',
                parentKey: 'apps-crm',
            },
            {
                key: 'crm-contacts',
                label: 'Contacts',
                link: '/apps/crm/contacts',
                parentKey: 'apps-crm',
            },
            {
                key: 'crm-opportunities',
                label: 'Opportunities',
                link: '/apps/crm/opportunities',
                parentKey: 'apps-crm',
            },
            {
                key: 'crm-leads',
                label: 'Leads',
                link: '/apps/crm/leads',
                parentKey: 'apps-crm',
            },
            {
                key: 'crm-customers',
                label: 'Customers',
                link: '/apps/crm/customers',
                parentKey: 'apps-crm',
            },
        ],
    },
];

// menu items for horizontal layout
const HORIZONTAL_MENU_ITEMS: MenuItem[] = [
    {
        key: 'dashboard',
        icon: 'home',
        label: 'Dashboard',
        isTitle: true,
        collapsed: true,
        children: [
            {
                key: 'ds-dashboard-1',
                label: 'Dashboard 1',
                link: '/dashboard-1',
                parentKey: 'dashboard',
            },
            {
                key: 'ds-dashboard-2',
                label: 'Dashboard 2',
                link: '/dashboard-2',
                parentKey: 'dashboard',
            },
            {
                key: 'ds-dashboard-3',
                label: 'Dashboard 3',
                link: '/dashboard-3',
                parentKey: 'dashboard',
            },
            {
                key: 'ds-dashboard-4',
                label: 'Dashboard 4',
                link: '/dashboard-4',
                parentKey: 'dashboard',
            },
        ],
    },
    {
        key: 'apps',
        icon: 'grid',
        label: 'Apps',
        isTitle: true,
        collapsed: true,
        children: [
            {
                key: 'apps-calendar',
                label: 'Calendar',
                isTitle: false,
                icon: 'calendar',
                link: '/apps/calendar',
                parentKey: 'apps',
            },
            {
                key: 'apps-chat',
                label: 'Chat',
                isTitle: false,
                icon: 'message-square',
                link: '/apps/chat',
                parentKey: 'apps',
            },
            {
                key: 'apps-ecommerce',
                label: 'Ecommerce',
                isTitle: false,
                icon: 'shopping-cart',
                parentKey: 'apps',
                collapsed: true,
                children: [
                    {
                        key: 'ecommerce-dashboard',
                        label: 'Dashboard',
                        link: '/apps/objet/dashboard',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-products',
                        label: 'Products',
                        link: '/apps/objet/products',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-details',
                        label: 'Product Details',
                        link: '/apps/objet/product/details/',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-products-edit',
                        label: 'Add Product',
                        link: '/apps/objet/products-edit',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-customers',
                        label: 'Customers',
                        link: '/apps/objet/customers',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-orders',
                        label: 'Orders',
                        link: '/apps/objet/orders',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-order-details',
                        label: 'Order Details',
                        link: '/apps/objet/order/details',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-sellers',
                        label: 'Sellers',
                        link: '/apps/objet/sellers',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-shopping-cart',
                        label: 'Shopping Cart',
                        link: '/apps/objet/shopping-cart',
                        parentKey: 'apps-ecommerce',
                    },
                    {
                        key: 'ecommerce-checkout',
                        label: 'Checkout',
                        link: '/apps/objet/checkout',
                        parentKey: 'apps-ecommerce',
                    },
                ],
            },
            {
                key: 'apps-crm',
                label: 'CRM',
                isTitle: false,
                icon: 'users',
                parentKey: 'apps',
                collapsed: true,
                children: [
                    {
                        key: 'crm-dashboard',
                        label: 'Dashboard',
                        link: '/apps/crm/dashboard',
                        parentKey: 'apps-crm',
                    },
                    {
                        key: 'crm-contacts',
                        label: 'Contacts',
                        link: '/apps/crm/contacts',
                        parentKey: 'apps-crm',
                    },
                    {
                        key: 'crm-opportunities',
                        label: 'Opportunities',
                        link: '/apps/crm/opportunities',
                        parentKey: 'apps-crm',
                    },
                    {
                        key: 'crm-leads',
                        label: 'Leads',
                        link: '/apps/crm/leads',
                        parentKey: 'apps-crm',
                    },
                    {
                        key: 'crm-customers',
                        label: 'Customers',
                        link: '/apps/crm/customers',
                        parentKey: 'apps-crm',
                    },
                ],
            },
            {
                key: 'apps-email',
                label: 'Email',
                isTitle: false,
                icon: 'mail',
                parentKey: 'apps',
                collapsed: true,
                children: [
                    {
                        key: 'email-inbox',
                        label: 'Inbox',
                        link: '/apps/email/inbox',
                        parentKey: 'apps-email',
                    },
                    {
                        key: 'email-read-email',
                        label: 'Read Email',
                        link: '/apps/email/details',
                        parentKey: 'apps-email',
                    },
                    {
                        key: 'email-compose-email',
                        label: 'Compose Email',
                        link: '/apps/email/compose',
                        parentKey: 'apps-email',
                    },
                ],
            },
            {
                key: 'apps-social',
                label: 'Social Feed',
                isTitle: false,
                icon: 'rss',
                link: '/apps/social-feed',
                badge: { variant: 'pink', text: 'Hot' },
                parentKey: 'apps',
            },
            {
                key: 'apps-companies',
                label: 'Companies',
                isTitle: false,
                icon: 'activity',
                link: '/apps/companies',
                parentKey: 'apps',
            },
            {
                key: 'apps-projects',
                label: 'Projects',
                isTitle: false,
                icon: 'briefcase',
                parentKey: 'apps',
                collapsed: true,
                children: [
                    { key: 'project-list', label: 'List', link: '/apps/projects/list', parentKey: 'apps-projects' },
                    {
                        key: 'project-details',
                        label: 'Details',
                        link: '/apps/projects/details',
                        parentKey: 'apps-projects',
                    },
                    {
                        key: 'project-create-project',
                        label: 'Create Project',
                        link: '/apps/projects/create',
                        parentKey: 'apps-projects',
                    },
                ],
            },
            {
                key: 'apps-tasks',
                label: 'Tasks',
                isTitle: false,
                icon: 'clipboard',
                parentKey: 'apps',
                collapsed: true,
                children: [
                    { key: 'task-list', label: 'List', link: '/apps/tasks/list', parentKey: 'apps-tasks' },
                    { key: 'task-details', label: 'Details', link: '/apps/tasks/details', parentKey: 'apps-tasks' },
                    { key: 'task-kanban', label: 'Kanban Board', link: '/apps/tasks/kanban', parentKey: 'apps-tasks' },
                ],
            },
            {
                key: 'apps-contacts',
                label: 'Contacts',
                isTitle: false,
                icon: 'book',
                parentKey: 'apps',
                collapsed: true,
                children: [
                    {
                        key: 'contacts-list',
                        label: 'Members List',
                        link: '/apps/contacts/list',
                        parentKey: 'apps-contacts',
                    },
                    {
                        key: 'contacts-profile',
                        label: 'Profile',
                        link: '/apps/contacts/profile',
                        parentKey: 'apps-contacts',
                    },
                ],
            },
            {
                key: 'apps-tickets',
                label: 'Tickets',
                isTitle: false,
                icon: 'aperture',
                parentKey: 'apps',
                collapsed: true,
                children: [
                    { key: 'tickets-list', label: 'List', link: '/apps/tickets/list', parentKey: 'apps-tickets' },
                    {
                        key: 'tickets-details',
                        label: 'Details',
                        link: '/apps/tickets/details',
                        parentKey: 'apps-tickets',
                    },
                ],
            },
            {
                key: 'apps-file-manager',
                label: 'File Manager',
                isTitle: false,
                icon: 'folder-plus',
                link: '/apps/file-manager',
                parentKey: 'apps',
            },
        ],
    },
    {
        key: 'base-ui',
        icon: 'briefcase',
        label: 'UI Elements',
        isTitle: true,
        collapsed: true,
        children: [
            { key: 'base-ui-buttons', label: 'Buttons', link: '/ui/buttons', parentKey: 'base-ui' },
            { key: 'base-ui-cards', label: 'Cards', link: '/ui/cards', parentKey: 'base-ui' },
            { key: 'base-ui-avatars', label: 'Avatars', link: '/ui/avatars', parentKey: 'base-ui' },
            { key: 'base-ui-portlets', label: 'Portlets', link: '/ui/portlets', parentKey: 'base-ui' },
            {
                key: 'base-ui-tabs-accordions',
                label: 'Tabs & Accordions',
                link: '/ui/tabs-accordions',
                parentKey: 'base-ui',
            },
            { key: 'base-ui-modals', label: 'Modals', link: '/ui/modals', parentKey: 'base-ui' },
            { key: 'base-ui-placeholders', label: 'Placeholders', link: '/ui/placeholders', parentKey: 'base-ui' },
            { key: 'base-ui-progress', label: 'Progress', link: '/ui/progress', parentKey: 'base-ui' },
            { key: 'base-ui-notifications', label: 'Notifications', link: '/ui/notifications', parentKey: 'base-ui' },
            { key: 'base-ui-spinners', label: 'Spinners', link: '/ui/spinners', parentKey: 'base-ui' },
            { key: 'base-ui-images', label: 'Images', link: '/ui/images', parentKey: 'base-ui' },
            { key: 'base-ui-carousel', label: 'Carousel', link: '/ui/carousel', parentKey: 'base-ui' },
            { key: 'base-ui-listgroups', label: 'List Groups', link: '/ui/listgroups', parentKey: 'base-ui' },
            { key: 'base-ui-embedvideo', label: 'Embed Video', link: '/ui/embedvideo', parentKey: 'base-ui' },
            { key: 'base-ui-dropdown', label: 'Dropdowns', link: '/ui/dropdowns', parentKey: 'base-ui' },
            { key: 'base-ui-ribbons', label: 'Ribbons', link: '/ui/ribbons', parentKey: 'base-ui' },
            {
                key: 'base-ui-tooltips-popovers',
                label: 'Tooltips & Popovers',
                link: '/ui/tooltips-popovers',
                parentKey: 'base-ui',
            },
            { key: 'base-ui-general', label: 'General UI', link: '/ui/general', parentKey: 'base-ui' },
            { key: 'base-ui-typography', label: 'Typography', link: '/ui/typography', parentKey: 'base-ui' },
            { key: 'base-ui-grid', label: 'Grid', link: '/ui/grid', parentKey: 'base-ui' },
        ],
    },
    {
        key: 'components',
        icon: 'package',
        label: 'Components',
        isTitle: true,
        collapsed: true,
        children: [
            {
                key: 'extended-ui',
                label: 'Extended UI',
                isTitle: false,
                icon: 'layers',
                badge: { variant: 'info', text: 'Hot' },
                parentKey: 'components',
                collapsed: true,
                children: [
                    {
                        key: 'extended-ui-dragdrop',
                        label: 'Drag and Drop',
                        link: '/extended-ui/dragdrop',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-rangesliders',
                        label: 'Range Sliders',
                        link: '/extended-ui/rangesliders',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-animation',
                        label: 'Animation',
                        link: '/extended-ui/animation',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-sweet-alert',
                        label: 'Sweet Alert',
                        link: '/extended-ui/sweet-alert',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-tour',
                        label: 'Tour Page',
                        link: '/extended-ui/tour',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-loading-buttons',
                        label: 'Loading Buttons',
                        link: '/extended-ui/loading-buttons',
                        parentKey: 'extended-ui',
                    },
                ],
            },
            { key: 'widgets', label: 'Widgets', isTitle: false, icon: 'gift', link: '/widgets', parentKey: 'components', },
            {
                key: 'icons',
                label: 'Icons',
                isTitle: false,
                icon: 'cpu',
                parentKey: 'components',
                collapsed: true,
                children: [
                    { key: 'icon-two-tone', label: 'Two Tone Icons', link: '/icons/two-tone', parentKey: 'icons' },
                    { key: 'icon-feather', label: 'Feather Icons', link: '/icons/feather', parentKey: 'icons' },
                    { key: 'icon-mdiicons', label: 'Material Design Icons', link: '/icons/mdi', parentKey: 'icons' },
                    { key: 'icon-dripicons', label: 'Dripicons', link: '/icons/dripicons', parentKey: 'icons' },
                    { key: 'icon-font-awesome', label: 'Font Awesome 5', link: '/icons/font-awesome', parentKey: 'icons' },
                    { key: 'icon-themify', label: 'Themify', link: '/icons/themify', parentKey: 'icons' },
                    { key: 'icon-simple-line', label: 'Simple Line', link: '/icons/simple-line', parentKey: 'icons' },
                    { key: 'icon-weather', label: 'Weather', link: '/icons/weather', parentKey: 'icons' },
                ],
            },
            {
                key: 'forms',
                label: 'Forms',
                isTitle: false,
                icon: 'bookmark',
                parentKey: 'components',
                collapsed: true,
                children: [
                    { key: 'form-basic', label: 'General Elements', link: '/forms/basic', parentKey: 'forms' },
                    { key: 'form-advanced', label: 'Form Advanced', link: '/forms/advanced', parentKey: 'forms' },
                    { key: 'form-validation', label: 'Validation', link: '/forms/validation', parentKey: 'forms' },
                    { key: 'form-wizard', label: 'Wizard', link: '/forms/wizard', parentKey: 'forms' },
                    { key: 'form-upload', label: 'File Uploads', link: '/forms/upload', parentKey: 'forms' },
                    { key: 'form-editors', label: 'Editors', link: '/forms/editors', parentKey: 'forms' },
                ],
            },
            {
                key: 'tables',
                label: 'Tables',
                isTitle: false,
                icon: 'grid',
                parentKey: 'components',
                collapsed: true,
                children: [
                    { key: 'table-basic', label: 'Basic Tables', link: '/tables/basic', parentKey: 'tables' },
                    { key: 'table-advanced', label: 'Advanced Tables', link: '/tables/advanced', parentKey: 'tables' },
                ],
            },
            {
                key: 'charts',
                label: 'Charts',
                isTitle: false,
                icon: 'bar-chart-2',
                collapsed: true,
                parentKey: 'components',
                children: [
                    { key: 'charts-apex', label: 'Apex Charts', link: '/charts/apex', parentKey: 'charts' },
                    { key: 'charts-chartjs', label: 'Chart Js', link: '/charts/chartjs', parentKey: 'charts' },
                ],
            },
            {
                key: 'maps',
                label: 'Maps',
                isTitle: false,
                icon: 'map',
                parentKey: 'components',
                collapsed: true,
                children: [
                    { key: 'maps-googlemaps', label: 'Google Maps', link: '/maps/googlemaps', parentKey: 'maps' },
                    { key: 'maps-vectormaps', label: 'Vector Maps', link: '/maps/vectormaps', parentKey: 'maps' },
                ],
            },
            {
                key: 'menu-levels',
                label: 'Menu Levels',
                isTitle: false,
                icon: 'share-2',
                parentKey: 'components',
                collapsed: true,
                children: [
                    {
                        key: 'menu-levels-1-1',
                        label: 'Level 1.1',
                        link: '/',
                        parentKey: 'menu-levels',
                        collapsed: true,
                        children: [
                            {
                                key: 'menu-levels-2-1',
                                label: 'Level 2.1',
                                link: '/',
                                parentKey: 'menu-levels-1-1',
                                collapsed: true,
                                children: [
                                    {
                                        key: 'menu-levels-3-1',
                                        label: 'Level 3.1',
                                        link: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                    {
                                        key: 'menu-levels-3-2',
                                        label: 'Level 3.2',
                                        link: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                ],
                            },
                            { key: 'menu-levels-2-2', label: 'Level 2.2', link: '/', parentKey: 'menu-levels-1-1' },
                        ],
                    },
                    { key: 'menu-levels-1-2', label: 'Level 1.2', link: '/', parentKey: 'menu-levels' },
                ],
            },
        ],
    },
    {
        key: 'pages',
        icon: 'file-text',
        label: 'Pages',
        isTitle: true,
        collapsed: true,
        children: [
            {
                key: 'error-pages',
                label: 'Errors',
                isTitle: false,
                parentKey: 'pages',
                // collapsed: true,
                children: [
                    { key: 'page-error-404', label: 'Error - 404', link: '/error-404', parentKey: 'error-pages' },
                    { key: 'page-error-404-two', label: 'Error - 404 Two', link: '/error-404-two', parentKey: 'error-pages' },
                    {
                        key: 'page-error-404-alt',
                        label: 'Error - 404-alt',
                        link: '/pages/error-404-alt',
                        parentKey: 'error-pages',
                    },
                    { key: 'page-error-500', label: 'Error - 500', link: '/error-500', parentKey: 'error-pages' },
                    { key: 'page-error-500-two', label: 'Error - 500 Two', link: '/error-500-two', parentKey: 'error-pages' },
                ]
            },
            {
                key: 'extra-pages',
                label: 'Utility',
                isTitle: false,
                parentKey: 'pages',
                // collapsed: true,
                children: [
                    { key: 'page-starter', label: 'Starter', link: '/pages/starter', parentKey: 'extra-pages' },
                    { key: 'page-timeline', label: 'Timeline', link: '/pages/timeline', parentKey: 'extra-pages' },
                    { key: 'page-sitemap', label: 'Sitemap', link: '/pages/sitemap', parentKey: 'extra-pages' },
                    { key: 'page-invoice', label: 'Invoice', link: '/pages/invoice', parentKey: 'extra-pages' },
                    { key: 'page-faq', label: 'FAQs', link: '/pages/faq', parentKey: 'extra-pages' },
                    {
                        key: 'page-search-result',
                        label: 'Search Results',
                        link: '/pages/serach-results',
                        parentKey: 'extra-pages',
                    },
                    { key: 'page-pricing', label: 'Pricing', link: '/pages/pricing', parentKey: 'extra-pages' },
                    {
                        key: 'page-maintenance',
                        label: 'Maintenance',
                        link: '/maintenance',
                        target: '_blank',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-upcoming',
                        label: 'Coming Soon',
                        link: '/upcoming',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-gallery',
                        label: 'Gallery',
                        link: '/pages/gallery',
                        parentKey: 'extra-pages',
                    },
                ]
            }

        ]
    }

];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };