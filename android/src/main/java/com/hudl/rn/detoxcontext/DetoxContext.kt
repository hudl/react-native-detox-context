package com.hudl.rn.detoxcontext

import android.content.Intent
import android.os.Bundle

object DetoxContext {
  @JvmStatic
  fun processLaunchArgs(intent: Intent?) = Bundle().apply {
    intent?.getBundleExtra("launchArgs")?.let {
      if (it.getString("isAutomatedTest", "false") == "true") {
        // If it's not an automated test then don't send anything
        putBundle("detoxContext", it)
      }
    }
  }
}
