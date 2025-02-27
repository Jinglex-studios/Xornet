import { createRouter, createWebHistory } from "vue-router";
import auth from "@/router/middleware/auth.js";

const routes = [
  {
    path: "/:info?",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home/Home.vue"),
    meta: {
      title: "Xornet | Home"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/home/Login.vue"),
    meta: {
      title: "Xornet | Login",
      guest: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import(/* webpackChunkName: "signup" */ "@/views/home/Signup.vue"),
    meta: {
      title: "Xornet | Signup",
      guest: true
    }
  },
  {
    path: "/downloads",
    name: "downloads",
    component: () => import(/* webpackChunkName: "downloads" */ "@/views/home/Downloads.vue"),
    meta: {
      title: "Xornet | Downloads"
    }
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import(/* webpackChunkName: "privacy" */ "@/views/home/Privacy.vue"),
    meta: {
      title: "Xornet | Privacy"
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/Dashboard.vue"),
    meta: {
      title: "Xornet | Dashboard",
      requiresAuth: true
    },
    children: [
      {
        path: "datacenters/:name?",
        name: "datacenters",
        component: () => import(/* webpackChunkName: "datacenters" */ "@/views/dashboard/Datacenters.vue"),
        meta: {
          title: "Xornet | Datacenters",
          guest: true
        }
      },
      {
        path: "logs",
        name: "logs",
        component: () => import(/* webpackChunkName: "logs" */ "@/views/dashboard/Logs.vue"),
        meta: {
          title: "Xornet | Logs"
        }
      },
      {
        path: "machines/:view",
        name: "machines",
        component: () => import(/* webpackChunkName: "machines" */ "@/views/dashboard/Machines.vue"),
        meta: {
          title: "Xornet | Machines"
        }
      },
      {
        path: "machines/machine/:machine/:view",
        name: "machine",
        component: () => import(/* webpackChunkName: "machine" */ "@/views/dashboard/Machine.vue"),
        meta: {
          title: "Xornet | Machine"
        }
      },
      {
        path: "profile/:username?",
        name: "profile",
        component: () => import(/* webpackChunkName: "profile" */ "@/views/dashboard/Profile.vue"),
        meta: {
          title: "Xornet | Profile"
        }
      },
      {
        path: "settings",
        name: "settings",
        component: () => import(/* webpackChunkName: "settings" */ "@/views/dashboard/Settings.vue"),
        meta: {
          title: "Xornet | Settings"
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Frontend redirecting
router.beforeEach(auth);

router.beforeEach(function(to, from, next) {
  if (Object.values(to.params)[0]) document.title = `Xornet | ${Object.values(to.params)[0]}`;
  next();
});

export default router;
