package com.peterparameter.troper

import com.peterparameter.troper.utils.EventBus
import org.junit.Test

class EventBusTest {
    data class Event(val id: String)

    @Test
    fun subscribeAndFire() {
        var fired = false
        val event = Event("id")
        val obs = EventBus.filter<Event>()
        obs.subscribe{
            fired = it.id === event.id
        }
        EventBus.post(event)
        assert(fired)
    }

    @Test
    fun subscribeUnsubAndFire() {
        var fired = false
        val event = Event("id")
        val obs = EventBus.filter<Event>()
        obs.subscribe{
            fired = it.id === event.id
        }.dispose()
        EventBus.post(event)
        assert(!fired)
    }
}